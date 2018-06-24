const APIURL_Comment = '/blog/comment/'

export async function createComment(val){
	return fetch(APIURL_Comment, {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify(val)
	})
	.then(resp => {
		if(!resp.ok) {
			if(resp.status >=400 && resp.status < 500) {
				return resp.json().then(data => {
					let err = {errorMessage: data.message};
					throw err;
				})
			} else {
				let err = {errorMessage: 'Please try again later, server is not responding'};
				throw err;
			}
		}
		return resp.json(resp);
	})
}


export async function getComment(id) {
	let url = APIURL_Comment+id;
	return fetch(url)
	.then(resp => {
		if(!resp.ok) {
			if(resp.status >=400 && resp.status < 500) {
				return resp.json().then(data => {
					let err = {errorMessage: data.message};
					throw err;
				})
			} else {
				let err = {errorMessage: 'Please try again later, server is not responding'};
				throw err;
			}
		}
		return resp.json();
	}) 
}

export async function updateComment(comment) {
  const updateURL = APIURL_Comment + comment._id;
   return fetch(updateURL, {
     method: 'put',
     headers: new Headers({
       'Content-Type': 'application/json',
     }),
     body: JSON.stringify(comment)
   })
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >=400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return resp.json(resp);
   })
}