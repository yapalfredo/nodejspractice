# nodejspractice - ToDoApp

## What's the purpose of this project?
Still part of my "getting back to coding in 2021" journey.  
Trying to get used to JavaScript (NodeJS).  
For the next week or two, I am going to just eat and sleep NodeJS.  
After that, I will start learning Solidity so I can start creating smart-contract apps.  
This is just a stepping stone to achieving my goal.  
I have an "unique idea", for a Decentralized Finance app in mind, and I haven't seen anyone implemented it yet.  
I can't tell about it now because I want to be the first one to ever do it.  
I'm basically on the research/acquiring skill phase at the moment. Once I'm done with this, I will go full throttle in building my app and turning my idea into a reality.  
Okay enough for the unrelated introduction.  

## What's this app about?
It's a really simple 'ToDo' web application.  
I can enter a list of things "to do".  
I can edit/update an item after adding.  
I can also delete an item.  
It has a basic authentication feature "WWW-Authenticate" to block unauthorized access.  
This app is working for me 100%, and successfully deployed online via [Heroku](https://yaptodoapp.herokuapp.com/)  

## What does this app lack?
Since this was a really simple web application, I didn't find the importance in following the standard application development design.  
With a tiny application like this, I don't think it would make sense to implement a software architectural pattern like MVC.
I enjoyed creating this application, but here are three things that this app is lacking:  
1.) Code Organization. There was no separation of the interface and logic codes.  
2.) Multi-user support. Right now, only me can login in to it.  
3.) Not enough details.  

## What's the stack used on this project?
MongoDB, Express, NodeJS.  
APIs: For asynchronus calls I used Axios. For for extra layer of security, I also used sanitize-html.  

## SCREENSHOT
![Alt text](/img.JPG?raw=true "ToDoApp Screenshot")
