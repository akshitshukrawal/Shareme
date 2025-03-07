import React, {useEffect,useState} from 'react';
import {AiOutlineLogout} from 'react-icons/ai';
import { useParams,useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedPinsQuery,userQuery,userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { fetchUser } from '../utils/fetchUser';
const randomImage = 'https://source.unsplash.com/1600x900/?nature,landscape,city';



const activeBtnStyles = 'bg-red-500 text-white font-bold rounded-full p-2 w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold rounded-full p-2 w-20 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text,setText] = useState('Created');
  const [activeBtn,setActiveBtn] = useState('Created');
  const navigate = useNavigate();
  const {userId} = useParams();
  const profileUser = fetchUser();
  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data)=>{
      setUser(data[0]);
    })
  }, [userId])

  useEffect(()=>{
    if(text==='Created'){
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
      .then((data)=>{
        setPins(data);
      })
    }else{
      if(userId === profileUser?.googleId){
        const savedPinsQuery = userSavedPinsQuery(userId);
        
        client.fetch(savedPinsQuery)
        .then((data)=>{
          setPins(data);
        })
      }
    }
  },[text,userId])
  
  const logout = () =>{
    localStorage.clear();
    navigate('/login');
  }
  if (!user) {
    return <Spinner message="Loading user profile..." />;
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className="flex flex-col justify-centerr items-center">
            <img src={randomImage} alt="banner"
            className='w-full h-37 2xl:h-500 shadow-lg object-cover' />
            <img src={user.image} alt="user" 
            className='rounded-full w-20 h-20 mt-10 shadow-xl object-cover'/>
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user._id && userId ===profileUser?.googleId && (
                <GoogleLogout 
                  clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout color='red' fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button
            type='button'
            onClick={(e)=>{
              setText(e.target.textContent);
              setActiveBtn('Created');
            }}
            className={`${activeBtn==='Created' ? activeBtnStyles : notActiveBtnStyles}`}>
              Created
            </button>
            {
              userId===profileUser?.googleId && (
                <button
            type='button'
            onClick={(e)=>{
              setText(e.target.textContent);
              setActiveBtn('Saved');
            }}
            className={`${activeBtn==='Saved' ? activeBtnStyles : notActiveBtnStyles}`}>
              Saved
            </button>
              )
            }
            
          </div>
          {pins?.length ? (
          <div className='px-2'>
            <MasonryLayout pins={pins} />
          </div>
          ):(
            <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
              No Pins found!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
