This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

This web application is based on [Next.js](https://nextjs.org/) framework for frontend and backend development.

<br>

So we can have client side and server side code on the same project and deployed as one on a server.

<br>

I'm using also [MangoDB](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_footprint_row_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624584&gclid=CjwKCAjwqeWKBhBFEiwABo_XBthkJrA5bjkVZuoc6Pb9KNPF3cHKj86sUHJ3fgDWWLAlBqgnhDf5LBoCC4cQAvD_BwE) for database to have a complete application.


<br>

Also i am deploying this application online On [Vercel](https://vercel.com).


#Description

##UX

- Loading the spam reports list from databse that are not blocked.
- There are to options to do `block` or `resolve`.
- `Block` terminate the spam report and remove it from the list.
- `Resolve` set the report as resolved and disable the `block` button for protection reasons. (Not logic to resolve and block same spam report).
- Refresh data after each event clicked for having always uptodate data while working.

##api's

- `fetch` a *GET* api for viewing the data by looping on an array.
- `resolve` a *PUT* api for setting the report as resolved.
- `block` a *PUT* api for setting the report as blocked.

##addons

- `Loaders` and `Toast Messages` for letting the user know whats happening.

