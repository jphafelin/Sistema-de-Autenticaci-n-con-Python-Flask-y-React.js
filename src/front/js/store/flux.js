const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/register")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password) => {

                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                };
                try {
                    const resp = await fetch("https://3001-jphafelin-sistemadeaute-w6fxbhtly2h.ws-eu96b.gitpod.io/api/login", requestOptions)

                    if (resp.status != 200) {
                        console.log("An error has occurred");
                        return false;
                    }
                    const data = await resp.json();
                    const userId = {
                        id: data.id
                    }
                    console.log(data)
                    
                    sessionStorage.setItem("token", data.access_token);
                    setStore({
                        token: data.access_token
                    })

                    return true;
                } catch (error) {
                    console.error("There has been an error login in")
                }
            },
            synctoken: () => {
                const token = sessionStorage.getItem("token");
                console.log("App just loaded, synching the local storage");
                if (token && token != "" && token != undefined) setStore({
                    token: token
                });
            },
			logout: () => {
                const token = sessionStorage.removeItem("token");
				
                setStore({
                    token: null
                });
            },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
