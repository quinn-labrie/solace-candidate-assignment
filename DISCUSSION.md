# Discussion

The main area of improvement I would focus on would be performance optimizations.

As it stands there is no pagination, so the entire database is dumped into the frontend which would be problematic with large datasets.

I did introduce tanstack query to handle client side caching to reduce the amount of api calls made but server side caching would be a good addition here.

Other Opimizations and Features:

- Database indexes to speed up queries
- Debouncing the search input to reduce api calls
- If using profile pictures for the advocates we would add image caching on the frontend to reduce client side loading times.
- Geolocation based searching would be a great feature to add.
- I would also add a way to see more detailed information on the advocate, maybe a modal or profile I could click into.
