# CAA: Trello-like application

This repository serves as homework repo for [Cloud Application Architecture](https://unicornuniversity.net/cs/cloud-application-architecture) subject.

> This is deeply inspired by [Cloud Application Architecture repo](https://github.com/UnicornUniversity/bcaa-summer-2024/) by [IMilota](mailto:imilota@centrum.cz)

# Installation 

In order to use this app, you need [Docker](https://docs.docker.com/get-docker/) either as Docker Desktop (for Windows and Mac) or as pure docker (Linux). 

# Run

To start containers, simply type 

```sh
docker-compose up 
```

Server is accessible via [localhost:8042](http://localhost:8042) and client via [localhost:3042](http://localhost:3042). 

## General idea of the app 

The goal of this project is to create an advanced to-do list
simple to-do list (getting things done)
a reminder of things which are relevant shortly, but still not burning
long-term planner (e.g. where I want to be in a few months, what I want to do with the ability to split Goals into smaller tasks with defined milestones)
Bucketlist manager

​
Imagine that you're in my head. A lot of things to do. Sometimes too much. Sometimes you just don't know where to start. Sometimes you just don't know how to start. Sometimes you just keep going and going until it's 3 AM and it's time to finish your stuff. Sometimes all of the "burning" things prevail over your long-term goals and dreams and at the end of the day you end up with a half-of-the-size to-do list, but none of it moved you forward as a person. And yeah. Of course, you forgot to process another 5 things due next week. Sounds familiar?
​
If you’re having trouble with forgetting about things all the time you probably tried everything from a paper todo-list which got lost all the time, to an online to-do list which grew to hundreds of lines and then you just ended up procrastinating thanks to your executive dysfunction. So you tried something more sophisticated - a ticketing system. It's slightly better, it helps you feel like you don't have to do that much because you don't see things which are not due next week (or any other period) but it has several problems and I'd like to address them in this app.
​
### Creating deadlines
When it comes to planning what's important, naturally you'd like to get things done as soon as possible. However, when creating a ticket, you need to set a due date for your filters to work and that takes ages. At the end of the day, you end up spending more time on creating a ticket than on the actual ticket. This can be mitigated by creating tickets in specific columns using automation, however, it's not working ideally.
​
### Fulfilling deadlines
When you have several columns based on a priority of the tasks, they easily end up in a column "DO IT NOW!!" and you're back to the original problem of a to-do list which has too many items to process within one day... and you're again in executive dysfunction problem.
The solution would be a postpone button, but when you press it, you end up in an identical situation roughly a week later.
​
### Bulk-processing changes
You might end up going on a vacation, so after some time you end up overwhelmed by too many things which are due NOW. With a feature that would select things you simply can't fulfil on vacation for some reason (place-dependent, time-dependent, missing pre-requisites) and postpone them for later so it feels like you can breathe.
​
### Location-dependent issues and pre-requisites
Imagine a situation when you want to fix something at your cottage. It's far away, you need to get some tools and materials there to be able to make changes. But plans have changed and the location-dependent goals to get yourself material can't be fulfilled, thus you can't simply fix it.
The idea is to implement a chain of dependencies which would move its due date accordingly.
​
### Long-term planner
Another thing you might struggle with is breaking a complex problem into smaller pieces. For instance, you want to get a driving licence. After some research turns out that several sub-steps have to be done, such as a medical check, researching available options, sign up etc. You have a general idea that you want it this summer. But by setting a deadline on the first day of the summer holidays you wouldn't get a driving licence, it would sign you up for courses at the best. It's hard to think about all of these steps when you have hundreds of things in mind. Long-term planning would allow you to create a list of dependencies and you can easily see the progress.
​
### Bucketlist planner
Not every dream of yours can fit in between of meetings, but it's important to have them somewhere on eyes. Recently I set my bucketlist as a wallpaper and I feel like it's helping me achieve things from it more quickly. As this is a long-term planning activity with multiple steps, it might be quite tricky to remember about pushing it forward in everyday life. From this feature I'd expect somthing similar as with long-term planner, but with an option to "mark it as an active goal". There might be things from your bucketlist you're stil not sure about or you're waiting for something to happen/someone to come. Thus not every item from your buckelist is relevant at the moment and we need to separate them.
​
​

## From the user POV

I'd axpect the app to

Allow me to better organize things around me
Remind me things
Help me procss better things that should be done repetitively, as cleaning windows
Help me better organize my long-term goals
Help me to bring things from bucketlist to reality
work more or less like Trello, but with less hassle around adding new tasks
