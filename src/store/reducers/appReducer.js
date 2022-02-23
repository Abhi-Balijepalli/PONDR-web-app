
const initState = {
  advanceAnalytics: {},
  basicAnalytics: {},
  products: {},
  aiHistory: {}
};

const appReducer = (state = initState, action) => {
  if (action.type === 'ADD_ADVANCE_ANALYTICS') {
    const newAnalytics = {
      ...state.advanceAnalytics,
      [action.newAdvanceAnalytics.product_id]: action.newAdvanceAnalytics
    };

    return { ...state, advanceAnalytics: newAnalytics };
  } else if (action.type === 'ADD_BASIC_ANALYTICS') {
    const newAnalytics = {
      ...state.basicAnalytics,
      [action.newBasicAnalytics.product_id]: action.newBasicAnalytics
    };

    return { ...state, basicAnalytics: newAnalytics };
  } else if (action.type === 'ADD_PRODUCT') {
    const newProducts = {
      ...state.products,
      [action.newProduct.product_id]: action.newProduct
    };

    return { ...state, products: newProducts };
  } else if (action.type === 'ADD_AI_QUESTION') {
    const newAiHistory = [
      action.newQuestion, ...state.aiHistory[action.productId].responses
    ];

    return {
      ...state,
      aiHistory: {
        ...state.aiHistory, [action.productId]: { responses: newAiHistory }
      }
    };
  } else if (action.type === 'SET_AI_HISTORY') {
    return { ...state, aiHistory: { [action.productId]: action.newHistory } };
  } else {
    return state;
  }
};

export default appReducer;
