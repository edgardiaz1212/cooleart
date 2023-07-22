import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card2 from "../component/Card2.jsx"
import { useNavigate } from "react-router-dom";

const ExplorePage = () => {
  const { store,actions } = useContext(Context);
  const { ilustrationData } = store;
  const {getAllIlustrations} = actions
  const creators = [...new Set(ilustrationData.map((ilustration) => ilustration.user.alias))]
  const navigate = useNavigate()
  const redirectProfile = (alias)=>{navigate(`/profile/${alias}`)}

  useEffect(()=>{getAllIlustrations()},[])  


  return (
    <>
      <div className="container">
        <div className="input-group my-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Busqueda
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="que tipo de imagen estas buscando?"
          />
        </div>
        
       
     

        {creators.map((creator) => (
          <div key={creator}>
            
            <h2 className=" m-3 lh-1 barra text-white p-2">Ilustraciones de {creator}</h2>
            
            <div className="row ">
              {ilustrationData
                .filter((ilustration) => ilustration.user.alias === creator).slice(0,6)
                .map((ilustration) => (
                  <div className="col pb-2" key={ilustration.id}>
                    <Card2
                      title={ilustration.title}
                      description={ilustration.description}
                      image={ilustration.image}
                      user={ilustration.user.name}
                      id={ilustration.id}
                      alias={ilustration.user.alias}
                    />
                  </div>
                ))}
            </div>

          </div>
        ))}
<button 
className="btn btn-primary mt-3"
onClick={()=>redirectProfile(creators)}> Ver mas de {creators}

</button>
      </div>
    </>
  );
};

export default ExplorePage;

