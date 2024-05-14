import {FaUserFriends, FaUserShield, FaUserSlash} from "react-icons/fa";
import {useContext} from "react";
import {UserContext} from "./context/UserContext";

function BoardPermissionsBadge({board}) {

  const {loggedInUser} = useContext(UserContext);
  const isOwner = board.userId === loggedInUser.id;
  const isSharedWith = board.sharedWith && board.sharedWith.includes(loggedInUser.id);
  const isNotOwnerNeitherSharedWith = !isOwner && !isSharedWith;

  return (

    <div style={{display: 'flex', alignItems: 'center'}}>
      {isOwner ? (
        <>
          <FaUserShield style={{marginRight: '8px'}}/>
          <span>Owned</span>
        </>
      ) : null
      }
      {isSharedWith ? (
        <>
          <FaUserFriends style={{marginRight: '8px'}}/>
          <span>Shared with me</span>
        </>
      ) : null
      }
      {isNotOwnerNeitherSharedWith ? (
        <>
          <FaUserSlash style={{marginRight: '8px'}}/>
          <span>Error</span>
        </>
      ) : null
      }
    </div>
  );
}

export default BoardPermissionsBadge;
