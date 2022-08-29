const url = 'https://api.pipefy.com/graphql';

const queryCards = `
  query {
    allCards (pipeId: ${302608368}) {
      edges {
        node {
          id
          title
          subtitles {
            name
            value
          }
          labels {
            name
            color
          }
        }
      }
    }
  }
`;
function mutation(data) {
  return `
  mutation {
    createCard (input:{
      pipe_id: ${302608368}
      fields_attributes: [
        {field_id:"product_name", field_value:"${data.title}"}
        {field_id:"product_description", field_value:"${data.description}"}
        {field_id:"suggester_name", field_value:"${data.name}"}
        {field_id:"suggester_email", field_value:"${data.email.trim()}"}
        ${data.priority ? `{field_id:"priority", field_value:"${data.priority}"}` : ''}
      ]
    }) {
      clientMutationId
    }
  }
  `
}

function mutationUpdate(data) {
  return `
  mutation {
    n1 : updateCardField (input:{ card_id: ${data.id}
      field_id:"product_name", new_value:"${data.title}"}){
    success
  }
    n2 : updateCardField (input:{ card_id: ${data.id} 
      field_id:"product_description", new_value:"${data.description}"}){
    success
  }
    n3 : updateCardField (input:{ card_id: ${data.id}
      field_id:"suggester_name", new_value:"${data.name}"}){
    success
  }
    n4 : updateCardField (input:{ card_id: ${data.id} 
      field_id:"suggester_email", new_value:"${data.email.trim()}"}){
    success
  }
  ${data.priority ? `n5 : updateCardField (input:{ card_id: ${data.id}
      field_id:"priority", new_value:"${data.priority}"}){
        success
      }` : ''}
    }
  `
}



function deleting(idCard) {
  return `
  mutation {
    deleteCard(input: {id: ${idCard}}) {
      success
    }
  }
  `
}

function options(body) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIxMzQ2NTQsImVtYWlsIjoiYW5kZXJzb2FyZXNtYXJ0aW5zQGdtYWlsLmNvbSIsImFwcGxpY2F0aW9uIjozMDAxODUzMDB9fQ.bM-0-Z_Lv_9NTolGNz_tMSxnU0U6iavI-U83j9ypym5MhpTBAY02YEj9lxB6E4YLJI5024ZSqzFxWyBVxWi79g',
    },
    body: JSON.stringify({ query: body }),
  }
}

export const fetchCards = () => {
  return fetch(url, options(queryCards))
}

export const createCard = async (data) => await fetch(url, options(mutation(data)))

export const deleteCard = async (data) => await fetch(url, options(deleting(data)))

export const updateCard = async (data) => await fetch(url, options(mutationUpdate(data)))
