### Running the app
1: npm install (to install dependencies)
2: npm start
Optional: https://www.beercollection.lunarlayer.com/

### Preface
- A lot of time was spent redoing things and learning new technologies (react-hook-form)

### Architecture
- Splitting everything into components makes it easier to maintain as well as adding new components.
- Since showcase uses a lot of components, i decided to put them in a showcase folder inside the components folder.
Since they will only ever be used by showcase, i saw it fit to gather them instead of having them clutter up the components folder.
- To avoid "prop drilling" and because the app is fairly small, I decided to use one AppContext.


### Possible improvements
# FilterModal
- Filter modal dynamically shows number of results from the current user search

# ShowcaseSlider
- When sliding between slides, reset scrollheight to start seeing the next slide from the top.

### Notes:
- Error checking is only set on the beer name field when adding a beer, for ease of testing
- Spent a lot of time improving and redesigning existing code. 
- Learning to use/style HTML tables
- Learning to use React Hook Forms
- Used and ditched React datepicker for the AddBeer first_brew date.
- Ditched having a scrollbar inside a slider - does not work on mobile.
- When uploading images (addBeer) it is presumed that the user is constricted to use a pre-determined crop.
- Shouldn't be able to add another food pairing / hop / malt / comment until the first one has been filled out.
- The "Expand all" button should hide when opening the filter
- Overall needs a big overhaul on styling as well as improvements of the UX
- The CSS needs optimization for readability and to avoid duplicate code.
- Needs more testing on different devices.
- Add beer input fields needs type restrictions 
- Adding comments to a beer does not work unless on the addBeer page - needs implementation.

### Total time: ~40 hours
A lot of time was spent trying out new technologies and iteratively improving.
My priority has always been a great user experience. 
I do realize I spent too much time overall, in part because I like to learn new things, 
but mostly because of my personal challenges with perfectionism. 
Handing in the assignment in the state that it is, is not something I'm happy about - But I guess it's good to practice and face my own imperfection (: