# Summary

## Development process and architecture overview

After reading the requirements I established few points that I followed while deciding on libraries and approach to use.

I knew I want the application to:

1. **have a decent UI / UX:** Because of the time limit, this had to be a compromise. I used [_Shadcn UI_](https://ui.shadcn.com/) and [_Tailwind_](https://tailwindcss.com/) to help me easily create and customize needed UI components.
2. **be responsive:** I started developing the UI with _mobile first_ approach. This was made relatively easy by using _Tailwind_, but again I had to cut some corners because of the time limit. Tha application is usable on mobiles and tablets, but if I had more time I would focus on creating some UI components specificaly for mobile devices. For example slider is likely not ideal to use on mobiles.
3. **handle API requests on the server:** To ensure security and simplify handling of loading and error states.
4. **keep the application state in URL:** To ensure users can share their filters, pagination and movie details links.
5. **have a well organized & maintainable code base:** I find it helpful to define clear rules about the project structure at the very beginning. Also smaller and well defined components are easier to test. This is another area where I had to cut some corners because of time, but I did setup some basic project structure - `lib` folder for APIs and utilities, `components` folder for simple UI components, `app/movies` folder for all movies related components and so on.

## Recommended improvements

1. I've had only few minutes to test the application and I ran out of time before I could write any automated tests. I am sure both manual and automated testing would uncover some bugs and therefore improve the UX and stability of the application.
2. If this would be a real world application that's planned for production, I would definitely spend some time on security. At the very least the API key should be extracted to environmental variable and removed from the repository. Some kind of request limiting would also be necessary before deploying the app publicly.
3. There's still quite a lot of possible UI improvements: I didn't have time to update the _Tailwind_ theme so some UI components don't look exactly how they should. As I already mentioned sliders are likely poor choice for mobile devices and even on desktop at least the release years range could use some more appropriate component (For example 2 select boxes - From and To).
4. There are some basic accessibility features, but this area could be greatly improved as well.
5. The code could use some more cleaning up. API functions could be refactored and likely also made more efficient. Components could be split.
6. There are basic loading states, using skeletons, but they could be improved. The loading componetns could be made smarter, for example waiting few ms before showing the loading state so the UI doesn't flicker if data is loaded fast or showing a message to the user if data is loading slow. There should also be more loading indicators for things like pagination and filtering.
7. UX would benefit from some custom error handling that would allow user to reset the state of the application and try again.
8. There is basic caching that comes out of the box with NextJS, but we could significantly reduce the load on the server by implementing more sofisticated caching solution. Especially for a resource like movies, that doesn't change so often, it might make sense to keep the local cache longer. Or maybe even choose the properties that are not likely to change, store them locally and only refetch properties that might change more often (for example ratings).
9. There's much more interesting information about each movie coming from the API. Might be worth it to take some time and think what else should we display in the application.
10. Project dependencies should be cleaned up: not a big deal since the unused ones won't be part of the deployed build, but stil...
11. I am sure there are many more possible improvements: better filters, light and dark mode, animations...

## Missing features

### Core

- missing similar movies section in movie details
- missing discovery timer feature

### Bonus

- missing graceful handling of errors and handling of loading could also be improved
- using just basic NextJS caching, but this could also be improved
- missing unit tests

## Used libraries

#### [Shadcn UI](https://ui.shadcn.com/)

I chose shadcn because it's easy to setup, easy to customize and allows me to prototype quickly.

#### [Tailwind](https://tailwindcss.com/)

Same reason for Tailwind: fast to work with + gives me a basic theming capabilities out of the box.

#### [Lucide icons](https://lucide.dev/guide/packages/lucide-react)

Lots of good options here. I like their React package and I think the icons look very slick.

#### [Valibot](https://valibot.dev/)

To validate API responses and transform them to appropriate objects.

#### [DayJS](https://day.js.org/)

Not really necessary for this project, but makes work with JS dates much simpler and most of all immutable.
