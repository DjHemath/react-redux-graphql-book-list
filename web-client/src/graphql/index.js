// export const URI = 'http://localhost:5000/graphql';
export const URI = window.location.origin + '/graphql';

export async function queryGraphQL(query) {
    const res= await fetch(URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query})
    });

    const {data} = await res.json();
    return data;
}

export async function mutationGraphQL(query, variables = {}) {
    console.log(variables);
    const res= await fetch(URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query, variables})
    });

    const {data} = await res.json();
    return data
}