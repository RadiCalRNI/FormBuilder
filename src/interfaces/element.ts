export interface IElements {
  inputs: IElementInput[],
  selections: IElementSelection[],
  rangeSlider: IElementRangeSlider[];
}

export interface IElementInput {
  id: number,
  icon: string,
  heading: string,
  description: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  type: string,
  value?: ISelectionOption | ISelectionOption[] | string | number | boolean,
  min?: number,
  max?: number,
  options?: ISelectionOption[],
}

export interface IElementSelection {
  id: number,
  icon: string,
  heading: string,
  description: string,
  label?: string,
  type: string,
  value?: ISelectionOption | ISelectionOption[],
  options?: ISelectionOption[],
}

export interface ISelectionOption {
  id: number,
  label: string,
  value: any
}

export interface IElementRangeSlider {
  icon: string,
  heading: string,
  description: string,
   label?: string,
  type: string,
  step: number,
  min: number,
  max: number,
  required: boolean,
  value: number
}
