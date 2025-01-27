```mermaid
sequenceDiagram
    participant browser
    participant server


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: the browser sends form data to be stored on server and also adds the note to the page using JS dom

    server-->>browser: {"message":"note created"}
    deactivate server

