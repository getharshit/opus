"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FormField } from "@/types/form";
import QuestionTile from "./QuestionTile";

interface QuestionEditorProps {
  fields: FormField[];
  activeField: string | null;
  onFieldSelect: (fieldId: string) => void;
  onFieldUpdate: (fieldId: string, updates: Partial<FormField>) => void;
  onFieldDelete: (fieldId: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export default function QuestionEditor({
  fields,
  activeField,
  onFieldSelect,
  onFieldUpdate,
  onFieldDelete,
  onReorder,
}: QuestionEditorProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {fields.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`${snapshot.isDragging ? "shadow-lg" : ""}`}
                  >
                    <QuestionTile
                      field={field}
                      isActive={activeField === field.id}
                      onSelect={() => onFieldSelect(field.id)}
                      onUpdate={(updates) => onFieldUpdate(field.id, updates)}
                      onDelete={() => onFieldDelete(field.id)}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
