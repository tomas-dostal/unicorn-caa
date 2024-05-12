import { useContext, useState, useEffect } from "react";
import { TaskListContext } from "./context/TaskListContext.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { UserContext } from './context/UserContext.js';
import axios from 'axios';
import {mdiLoading} from "@mdi/js";
import Icon from "@mdi/react"; // Import axios for making HTTP requests // fixme replace with some provider

// [
//     {
//         "name": "Fucking do now",
//         "description": "This task is extremely urgent. Immediate attention is required to prevent serious consequences.",
//         "value": 1000
//     },
//     {
//         "name": "Can wait till tomorrow",
//         "description": "This task can be completed by tomorrow without significant consequences. It's important but not urgent.",
//         "value": 800
//     },
//     {
//         "name": "Can wait till next week",
//         "description": "This task is important but can be postponed until next week without causing major issues.",
//         "value": 600
//     },
//     {
//         "name": "Can wait for two weeks",
//         "description": "This task is moderately important and can wait for up to two weeks before it becomes urgent.",
//         "value": 400
//     },
//     {
//         "name": "Can wait for a month",
//         "description": "This task is of medium priority and can be addressed within a month without any immediate consequences.",
//         "value": 200
//     },
//     {
//         "name": "Can wait 3 months",
//         "description": "This task has a lower priority and can wait for up to three months before it becomes urgent.",
//         "value": 100
//     },
//     {
//         "name": "Can wait 6 months",
//         "description": "This task has a low priority and can be postponed for up to six months before any significant impact.",
//         "value": 80
//     },
//     {
//         "name": "Can wait 12 months",
//         "description": "This task is of the lowest priority and can be deferred for up to twelve months without any immediate consequences.",
//         "value": 60
//     }
// ]
const schema = {
  type: "object",
  properties: {
    name: {type: "string"},
    description: {type: "string"},

    boardId: {type: "string", minLength: 32, maxLength: 32},
    authorId: {type: "string", minLength: 32, maxLength: 32},
    assigneeId: {type: "string", minLength: 32, maxLength: 32},
    priorityId: {type: "string", minLength: 32, maxLength: 32},
    // Fucking do now = 1000
    // Can wait till tomorrow  =
    // Can wait till next week  =
    // Can wait for to weeks  = 10000
    // Can wait for a month  = 1000
    // Can wait 3 months  = 100
    // Can wait 6 months  = 10
    // Can wait 12 months = 1

    status: {enum: ["created", "in progress", "blocked", "postponed", "freezer", "done"]},


    timeComplexityId: {type: "string", minLength: 32, maxLength: 32},
    // 1 Ezy 15min
    // 2 Moderate 30min
    // 3 Normal 1h
    // 4 1h
    // 5 3h
    // 10 8h
    // Over 8 hours I need to create subtasks/children

    createdDate: {type: "timestamp"},
    startDate: {type: "timestamp"},
    dueDate: {type: "timestamp"},

    repetitive: {
      type: "object",
      properties: {
        active: {type: "boolean", default: true},
        period: {type: "timestamp"},
      },
      optionalProperties: {
        listCompletedDates: {
          type: "array",
          items: {
            type: "object",
            properties: {
              competedDate: {type: "string", minLength: 24, maxLength: 24}
            },
            required: ["competedDate"],
            additionalProperties: false
          }
        },

      },
      required: ["active", "period"],
      additionalProperties: true
    },
    children: {
      type: "array",
      items: {
        type: "object",
        properties: {
          subtaskId: {type: "string", minLength: 32, maxLength: 32}
        },
        required: ["subtaskId"],
        additionalProperties: false
      }
    },

  },
  required: ["name", "boardId", "authorId"],
  additionalProperties: false
};


function TaskForm({ setShowTaskForm, task }) {
  const { state, handlerMap } = useContext(TaskListContext);
  const [showAlert, setShowAlert] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { loggedInUser } = useContext(UserContext); // Access UserContext

  useEffect(() => {
    // Fetch data for fields that need it from the backend
    const fetchData = async () => {
      try {
        // Fetch priorities
        const prioritiesResponse = await axios.get('localhost:8000/priority/list'); // fixme replace with some provider
        const priorities = prioritiesResponse.data;

        // Fetch assignees
        const assigneesResponse = await axios.get('localhost:8000/users/list'); // fixme replace with some provider
        const assignees = assigneesResponse.data;

        // Set the fetched data into the form data state
        setFormData({
          ...formData,
          priorities,
          assignees
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPending(true);
    const updatedFormData = { ...formData };
    updatedFormData.userId = loggedInUser.id; // Access userId from loggedInUser

    try {
      if (task.id) {
        updatedFormData.id = task.id;
        await handlerMap.handleUpdate(updatedFormData);
      } else {
        await handlerMap.handleCreate(updatedFormData);
      }

      setShowTaskForm(false);
    } catch (error) {
      console.error(error);
      setShowAlert(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const [priorities, setPriorities] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [formData, setFormData] = useState({
    name: task.name || '',
    description: task.description || '',
    assigneeId: task.assigneeId || '',
    priorityId: task.priorityId || ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const response = await axios.get('/api/priorities');
        setPriorities(response.data);
      } catch (error) {
        console.error('Error fetching priorities:', error);
      }
    };

    const fetchAssignees = async () => {
      try {
        const response = await axios.get('/api/users/list');
        setAssignees(response.data);
      } catch (error) {
        console.error('Error fetching assignees:', error);
      }
    };

    Promise.all([fetchPriorities(), fetchAssignees()])
      .then(() => setLoading(false))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);




  return (
    <Modal show={true} onHide={() => setShowTaskForm(false)}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>{`${task.id ? "Upravit" : "Vytvořit"} úkol`}</Modal.Title>
          <CloseButton onClick={() => setShowTaskForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se vytvořit úkol</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending && (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          )}

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Název</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Popis</Form.Label>
              <Form.Control
                type="text"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAssignee">
              <Form.Label>Assignee</Form.Label>
              <Form.Select
                name="assigneeId"
                value={formData.assigneeId}
                onChange={handleChange}
              >
                <option value="">Select Assignee</option>
                {assignees.map((assignee) => (
                  <option key={assignee.id} value={assignee.id}>
                    {assignee.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPriority">
              <Form.Label>Přiřazeno</Form.Label>
              <Form.Select
                name="priorityId"
                value={formData.priorityId}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTaskForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {task.id ? "Upravit" : "Vytvořit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

function taskDateToInput(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default TaskForm;
