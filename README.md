# Waller

## Day 1
### Work Done: 
 - Explore Unsplash API and Desktop wallpapers alternative

### Problems Faced
 - **Problem**: Anaconda3 package interfered with Gsettings( An API that allows you to access key/value pairs (e.g., persistent application settings) without directly talking to the actual backend that stores that data (config files, gconf, dconf). ).<br/>
 **Solution**: Need to change PATH in .profile file.
 - **Problem**: Unsplash API requires fetch which is a browser API.<br/>
 **Solution**: Used 'node-fetch' and required it in lib folder of unsplash-js.


## Plans

### If user doesn't has Unsplash token
 - [ ] Inform him
 - [ ] Use backup including NASA img, reddit img, etc

### When User has token 

 - [x] Give him query keyword option 
 - [x] if keyword, find img by that keyword and give him options
 - [x] else look for fallback keywords or fallback randomizer
 - [ ] Allow him for follow collections and Users and add them(Meh) 
 - [ ] To be continued...