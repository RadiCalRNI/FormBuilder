// common.ts
export const setStatus = (store: any, status: string) => {
  store.commit('setStatus', status);
};

export const addForm = (store: any) => {
  const lastFormId = store.getters.getForms.at(-1)?.id || 0
  const newForm = {
    id: lastFormId + 1,
    title: `فرم_${lastFormId + 1}`,
    elements: [],
  }

  store.commit('addForm', newForm)
  store.commit('setSelectedForm', newForm)
  setStatus(store, 'form')
}


const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

export const checkColorRegex = (value: string) => {
  if (!hexColorRegex.test(value)) return false
  return true
}
