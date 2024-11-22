import { createStore } from 'vuex';

export default createStore({
  state: {
    forms: [],
    selectedForm: null,
    droppedElements: [],
    selectedElement: null,
    status: "none"
  },
  getters: {
    getForms(state) {
      return state.forms
    },
    getSelectedForm(state) {
      return state.selectedForm
    },
    getDroppedElements(state) {
      return state.droppedElements;
    },
    getSelectedElement(state) {
      return state.selectedElement;
    },
    getStatus(state) {
      return state.status
    }
  },
  mutations: {
    // FORM
    addForm(state, form) {
      state.forms.push(form)
    },
    removeForm(state, id) {
      state.forms = state.forms.filter(form => form.id !== id)
    },
    setSelectedForm(state, form) {
      state.selectedForm = form;
      if (state.selectedForm.elements.length) {
        state.droppedElements = [...state.selectedForm.elements]
      }
    },
    setUnSelectedForm(state) {
      state.selectedForm = null
    },
    addElementsToForm(state, elements) {
      const index = state.forms.findIndex(form => form.id === state.selectedForm?.id);
      if (index !== -1) {
        state.forms[index].elements = elements;
      }
    },

    // ELEMENTS
    setSelectedElement(state, element) {
      state.selectedElement = element;
    },
    updateSelectedElement(state, { id, key, value }) {
      const element = state.droppedElements.find((el) => el.id === id);

      if (element) {
        element[key] = value;
      }
    },
    rearrangeIds(state) {
      state.droppedElements = state.droppedElements.map((el, index) => ({ ...el, id: index + 1 }));
    },
    removeElement(state, id) {
      state.droppedElements = state.droppedElements.filter((el) => el.id !== id);
      state.selectedElement = state.droppedElements.length ? state.droppedElements.at(-1) : null
    },
    addElement(state, element) {
      state.droppedElements.push(element);
    },
    clearAllElements(state) {
      state.droppedElements = []
      state.selectedElement = null
    },

    // Status
    setStatus(state, status) {
      state.status = status
    }
  },
});
