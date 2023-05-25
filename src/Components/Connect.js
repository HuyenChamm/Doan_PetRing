import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';
// import Comment from './Comment';

export default function Post() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const driver = neo4j.driver(
      'bolt://localhost:7687', 
      neo4j.auth.basic('neo4j', '0366913115')
    );
    
    const session = driver.session();
    
    session
      .run('MATCH (n)-[:POST]-(m) WHERE n.user_id = m.id RETURN m,n')
      .then(result => {
        const nodes = result.records.map(record => record.get('n').properties)
        setNodes(nodes);
        console.log(nodes)
      })
      .catch(error => console.error(error))
      .finally(() => session.close());
    
    return () => driver.close();
  }, []);



  return (
    <div className='container'>
         {nodes.map((node) => (
       <div className='py-10'>
            <div className='shadow-md py-10 pl-2 rounded-2xl  shadow-orange-400'>
              <div className='flex pl-3'>
                <img src="/images/avt_1.jpg" className="w-9 h-9 md:w-14 md:h-14 border-orange-600 border-solid border-2 rounded-full" alt="" />
                <div className='pl-4'>
                  <div className='flex'>
                    <p className='font-bold text-sm'>{node.name}</p>
                    <p className='pl-3 text-sm text-black'>{node.datetime}</p>
                  </div>
                 
                  <div className='-mt-6 w-20 h-5 text-center bg-gray-50 border border-orange-500 text-gray-900 text-xs rounded-full blockpx-2.5'>
                    <p className='mb-0 capitalize' >{node.post_setting}</p>
                  </div>
                </div>
              </div>

              <div className='w-4/5 m-auto py-10 text-black'>
                <p >
                {node.content}
                </p>
                <img  src={"/images/"+node.img} className="mx-auto w-48 md:w-96 " alt="" />
              </div>

              <div className='w-4/5 m-auto'>
                <ul className='flex'>
                  <li className='pr-3 text-black'>
                  <i className="fa-solid fa-heart pr-2 text-orange-500"></i>
                    Like
                  </li>
                  <li className='text-black'>
                  <i className="fa-solid fa-message pr-2 text-orange-500"></i>
                    Comment
                  </li>
                </ul>
              </div>
              <div className='w-4/5 m-auto border-solid border-t-2 border-orange-600'></div>
              <div className='w-4/5 m-auto md:flex justify-between mt-10  '>
                <div className='flex w-full  md:w-4/5'>
                  <textarea placeholder='User name, bạn đang nghĩ gì thế ?' className="resize-y rounded-md border-solid border-2 border-orange-300 px-2 w-full"></textarea> 
                </div>
                <div className='mt-3 md:mt-0'>
                  <button type="submit" className="text-white bg-orange-500 border-solid  border-2 hover:bg-orange-700 font-medium rounded-full text-sm  sm:w-auto px-5 py-1 text-center">Comment</button>
                </div>
              </div>
              {/* <Comment/> */}
            </div>
          </div>
          ))}
    </div>
  )
}
