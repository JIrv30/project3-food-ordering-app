1. install nextjs
2. setup intial front end page with header section and footer.
  a. create initial folder structure
  b. page.js is main app component
  c. globals.css is main css
  d. layout is main comnponet that renders app component
  e. components folder layout folder to hold all main sub components
3. connecting to mongodb
  a. set up api/auth/[...nextauth]/route.js
  b. inside route.js install mongodb and mongoose
    set up .env in main directory and use connection string from mongodb (connect via vs code string)
  c. set up models/User.js
  d.


6. updating user profile
  a. need to create new database schema to seperate other info otherwise google oAuth doesnt like
  b. create new model called UserInfo and connect it to mongoose
  c. in profile route PUT request should be split
    i. await User.updateOne({email},{name, image})
    ii. await UserInfo.findOneAndUpdate({email},otherUserInfo, {upsert:true})
    iii. need to add .lean() onto end of user and userInfo to only get info from doc in json object returnd from db

7. createing categories page
  a. need to ensure only admin people can get to it
    i. create new custom hook in components useProfile
    ii. useProfile fetches profile data and saves it into state.  It also sets loading state to make UX more fluid
    iii. import this cutom hook into categories page (for some reason name of object imported is changed here??)
    iv. set up a couple of if statements to see if data and loading are true.  this could be changed to redirect if you wish
  b.set up new form and inputs + styling
  c. handleNewCategorySubmit sends a new post request to new api route so need to set up this new route
  d. set up this new api route (categories) and new model (category) so it can connect to db
  e. need to grab the data from the categories db collection so useEffect in Catagories page and new GET request in categories route