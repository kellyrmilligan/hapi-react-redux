# What is the improvement?
Convert existing member apps to be 'universal' javascript apps. At its core, this means that the first time a user loads an app, the requested content will be presented when the page loads and will not request data and show a loading state. The next time a user navigates, it will be as it is today, meaning within apps only the data will be requested from page to page, and it will not reload the entire page. Secondarily, an auth caching layer will be built to make navigating between applications much, much faster so that we're not re-requesting `/me` and `/stylist` over and over again.

## Why is it important?
In order to improve the customer experience, the content should be provided right away when requested. This will also give us more flexibility and options when solving other issues such as between app navigation.

## Are there alternate solutions to the problem?
we could switch to a different server rendering layer, but to fully utilize our existing architecture, this would be the most efficient. to solve for between app nav, we can utilize browser level caching to pick up between apps. This solution will not really work on in private mode on mobile safari.

## How will we approach the work?
we would first separate login from `account_app`, into `login_app`. we would make it so that the existing apps that read the auth session cookie data can still read it. this will allow us to migrate apps one by one. There are various modules that need to be written, documented in the spreadsheet, that woudl be covered by the first app to ship.

When converting existing apps, it will be page by page, but will re-use the existing code. The main changes that need to be made are:

- adjusting for a new way to request data for each screen, which involves refactoring where the requests are made
- refactoring any single page app specific techniques to load only on the browser and not server side.


## How much will it cost?
The outlined approach will let us slowly roll this out. A login app I believe will take a little longer than expected, given it would be the first app. I believe this would take a full sprint due to finalizing of modules, deployment and infrastructure.

After that, the next apps will vary depending on size. I feel account_app could be adjusted quickly, probably in 1 week.

`member_messenger` app would be just adding the auth caching solution, the rest would be unchanged given the nature of the data from layer.

`cm_app` would take a while because it's using packages and techniques that are not like the rest of the apps. probably a full sprint.

`trunk_app` would take probably a week.

`onboarding_app` the same.
