# outlook_Prototype_Email

Building a prototype model of Outlook.

Features incoporated:

` 1. Dynamic Category Addition: The Folders [Inbox, Spam] displayed can be dynamically added through folders.json. Need to add the folder to be displayed and the route path json                                    to collect mail items.

  2. Representing Status of the application on Footer: Let's  to know the whether still reaching the server and any of the apis failed.
  3. Footers holds the total mail Items
  4. The Folders sections carries no. of unread messages in each category.
  5. Mail List Area where all the list of mail items displayed in each category
  6. Mail List has the features:
      a) User can preview the message
      b) [ LIMITING CHARS ]The subject and content are displayed for previewing by limiting no. of characters. This can be set through configuration in config file (config.js).
      c) The mail item can be changed to read to unread, flagged - unflagged, deleted
      d) The icons appear only on hovering the mail item
      e) On deletion, the mail items move to deletion folder. The mail items moving to which folder can be set through configuration. Making it dynamic (config.js).
      f) On hitting a mail item, if its unread becomes read and opens the detailed mail in Mail Box Area
   7. Dropdown Features:
      a) The dropdown filters mail items based on [flagged, unFlaggged, Read, unRead] in each category.
      b) The default filter control can be set through configuration (config.js)
      c) The dropdown resets on moving one category to another
   8. Mail Box:
      a) Shows Laoding.. icon till the message if fetched and displays the message then.

  9. State is retained in b/w refreshes using session storage
  10. Back Browser button and navigation works
  11. Page not found page is formed and routed for all deprecated scenarios
  12. Routing: If we try to hit the mail area body route url directly, then gets directed to default route as the api is not hit to read the data
  
    Hitting the url: http://localhost:3000/folders/inbox/guid-1   directly in the browser will route to default route http://localhost:3000/folders/inbox/
`

