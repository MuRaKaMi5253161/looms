import { Avatar } from '@mui/material'
import React, { forwardRef } from 'react'
import { VerifiedUser } from '@mui/icons-material';
import './PostContent.css';

const PostContent = forwardRef(({roomId,roomIdParm,PostText,PostImage,userName}, ref) => {

    //ポストデータのルームIDとステータスのルームIDを比較
    if(roomId == roomIdParm){
        return (
            <div className="postContent" ref={ref}>
                <div className='postContent_avatar'>
                    <Avatar />
                </div>
                <div className='postContent_body'>
                    <div className='postContent_header'>
                        <div className='postContent_headerText'>
                            <h3>
                                <span className='postContent_headerSpecial'>
                                    <VerifiedUser className='postContent_badge'/>
                                    {userName}
                                </span>
                            </h3>
                        </div>
                        <div className='postContent_headerDescription'>
                            <p>{PostText}</p>
                        </div>
                    </div>
                    <img className='img' src={PostImage}></img>
                </div>
              
            </div>
          )
        }
    }
)

export default PostContent
