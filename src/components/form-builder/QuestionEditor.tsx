"use client";

import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FormField } from "@/types/form";
import QuestionTile from "./QuestionTile";
import { useFieldFocus } from "./hooks/useFieldFocus";

interface QuestionEditorProps {
  fields: FormField[];
  onFieldUpdate: (fieldId: string, updates: Partial<FormField>) => void;
  onFieldDelete: (fieldId: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export default function QuestionEditor({
  fields,
  onFieldUpdate,
  onFieldDelete,
  onReorder,
}: QuestionEditorProps) {
  const { focusedFieldId, focusField, isFocused, setFields, getFocusClasses } =
    useFieldFocus();

  // Update fields in context when they change
  useEffect(() => {
    setFields(fields);
  }, [fields, setFields]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  const handleFieldSelect = (fieldId: string) => {
    focusField(fieldId);
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
                    data-field-id={field.id}
                    className={`${snapshot.isDragging ? "shadow-lg" : ""} ${
                      getFocusClasses(field.id).container
                    }`}
                  >
                    <QuestionTile
                      field={field}
                      isActive={isFocused(field.id)}
                      onSelect={() => handleFieldSelect(field.id)}
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
