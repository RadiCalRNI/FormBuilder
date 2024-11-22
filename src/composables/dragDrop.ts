export const handleDragStart = (event: DragEvent, element: any) => {
  event.dataTransfer?.setData('element', JSON.stringify(element))
};
