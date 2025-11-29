# DevConnect

A lightweight “LinkedIn for developers” for developers to share projects and connect.

---

## Overview

DevConnect is a social media platform for developers to connect, share projects, and collaborate. The goal is to create a space that focuses on meaningful tech discussion and project sharing rather than generic social content.

## Purpose

Most developer communities are fragmented across multiple platforms. DevConnect aims to simplify networking and collaboration for developers in on unified space.

## Features

* \[ ] User registration and login
* \[ ] Create, delete, and edit posts
* \[ ] Comment on and like/dislike a post or comment
* \[ ] DM other users in real time
* \[ ] Public profile page for each user with all their posts
* \[ ] Edit profile settings for each user
* \[ ] Main feed/timeline with recommended posts
* \[ ] Ability to follow or be followed by other users
* \[ ] Search bar where you can look for users or groups
* \[ ] Ability to make community groups that users can join/leave

## Tech Stack

**Frontend:** React, HTML, CSS, JavaScript
**Backend:** Node.js, Express.js
**Database:** MongoDB (Atlas)
**Other:** Docker, GitHub Actions (CI/CD), JWT, Render/Vercel for deployment

## Learning Objectives

* Learn how to build and structure and full MERN application
* Understand REST API design and authentication
* Practice docker containerization and CI/CD deployment
* Strengthen React component and state management skills

## User Flow

Users can register, create a profile with their skills and links, and post updates or project links. Users can also create their own groups, allowing them create their own sub-communities for their own niche interests or organizations. Other users can like and comment on posts, follow/unfollow other users, and join/leave groups, creating a community-driven feed.

## Project Structure

```
/devconnect
  /client          # React frontend
    /public
      index.html
    /src
      /components  # Reusable React components
      /pages       # Page components
      /context     # State management
      App.jsx
      main.jsx
  /server          # Node.js backend
    /controllers   # Route controllers
    /models        # Mongoose models
    /routes        # Express routes
    /config        # Database and server config
    server.js
    package.json
  Dockerfile
  docker-compose.yml
  .gitignore
  README.md
```

## Future Ideas / Goals

* \[ ] Notifications and a place in settings for it
* \[ ] Ability for users to create group chats in DMs
* \[ ] Ability to make groups public or private (with invites or pending join requests)
* \[ ] Dark mode style option
* \[ ] Tag system where users can add tags to their posts and then you can search based on tag.
* \[ ] Ability to sort timeline by following only

## References

* [React Docs](https://react.dev/)
* [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)

## Notes

* 

