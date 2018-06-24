const APIURL = '/blog/'

export async function getPosts() {
	return fetch(APIURL)
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

export async function createPost(val){
	return fetch(APIURL, {
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

export async function getPost(id) {
	let url = APIURL+id;
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

export async function updatePost(post) {
  const updateURL = APIURL + post._id;
   return fetch(updateURL, {
     method: 'put',
     headers: new Headers({
       'Content-Type': 'application/json',
     }),
     body: JSON.stringify(post)
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

export async function removePost(id){
  const deleteURL = APIURL + id;
   return fetch(deleteURL, {
     method: 'delete'
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
