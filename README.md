# sean.silvius.me 
## A nextjs website, mdx blogging. Drizzle/postgres storing messages.
This is my personal site's code. It is based on nextjs 14 app router. The drafts folder is not hooked up yet.

## The flow for the editor is 

sequenceDiagram
    participant LF as Local File
    participant GH as GitHub
    participant GC as getFileContent
    participant DS as Draft Store
    participant ED as Editor
    participant UI as User Interface

    Note over LF,UI: Initial Load Flow
    LF/GH->>GC: Request file content
    GC->>DS: Initialize draft
    DS->>ED: Set initial content
    ED->>UI: Render editor

    Note over ED,DS: Edit Flow
    UI->>ED: User edits
    ED->>DS: Update content
    DS->>DS: Mark as dirty
    DS->>DS: Auto-save (30s)

    Note over DS,GH: Save Flow
    UI->>DS: Click Save Draft
    DS->>DS: Update versions

    Note over DS,GH: Publish Flow
    UI->>GH: Publish (saveFile)
    GH-->>DS: Success
    DS->>DS: Clear draft