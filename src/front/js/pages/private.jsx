import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import back1 from "../../img/private.jpg";
import back2 from "../../img/private2.png";


export const Private = () => {
    const { store, actions } = useContext(Context);



    return (
        <>
            {store.token && store.token != "" && store.token != undefined ? (
                <div className="text-center">
                    <div className="cover-container d-flex w-100 flex-column">
                        <img className="d-block w-100" src={back1} />
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="text-center cover-container w-100 ">
                        <img className=" w-25" src={back2} />
                    </div>
                </div>
            )
            }
        </>
    );
};
