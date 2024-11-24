import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { useEditorStore } from '@/stores/editor';
import { 
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Settings,
  Undo,
  Redo,
  Link2,
  Strikethrough,
  RemoveFormatting} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Form from '@/components/forms/frontmatter';

const ToolbarButton = ({ 
  isActive = false, 
  onClick, 
  title, 
  children 
}: { 
  isActive?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <Tooltip delayDuration={300}>
    <TooltipTrigger asChild>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        size="sm"
        onClick={onClick}
        className="h-8 w-8 p-0"
      >
        {children}
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{title}</p>
    </TooltipContent>
  </Tooltip>
);

const EditorToolbar: FC = () => {
  const { editor } = useEditorStore();

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex items-center justify-between border-b p-2">
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo (⌘Z)"
            isActive={false}
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo (⌘⇧Z)"
            isActive={false}
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <div className="flex items-center space-x-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="Heading 1"
            isActive={editor.isActive('heading', { level: 1 })}
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="Heading 2"
            isActive={editor.isActive('heading', { level: 2 })}
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            title="Heading 3"
            isActive={editor.isActive('heading', { level: 3 })}
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <div className="flex items-center space-x-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold (⌘B)"
            isActive={editor.isActive('bold')}
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic (⌘I)"
            isActive={editor.isActive('italic')}
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
            isActive={editor.isActive('strike')}
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            title="Inline Code"
            isActive={editor.isActive('code')}
          >
            <Code className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={addLink}
            title="Add Link"
            isActive={editor.isActive('link')}
          >
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <div className="flex items-center space-x-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
            isActive={editor.isActive('bulletList')}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
            isActive={editor.isActive('orderedList')}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
            isActive={editor.isActive('blockquote')}
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <ToolbarButton
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          title="Clear Formatting"
          isActive={false}
        >
          <RemoveFormatting className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <Settings className="h-4 w-4 mr-2" />
            <span className="sr-only">Settings</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Edit the metadata for this document.
            </DialogDescription>
          </DialogHeader>
          <Form />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorToolbar;