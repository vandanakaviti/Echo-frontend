import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import IdeaService from '../services/idea.service';

const AllMyFavoriteIdeas = ({data}) => {
    const [isFavorite, setIsFavorite] = useState(false)

    const checkFavorite = useCallback((id) => {
        IdeaService.isFavoriteIdeaOfCurrentUser(id).then(
            (res) => setIsFavorite(res.data)
        )
        console.log(isFavorite)
      }, [isFavorite]);

    return (  
        <table className = "table">
            <thead style={{"textAlign":"center", "verticalAlign":"middle"}}>
                <tr>
                    <th> ID </th>
                    <th> Idea</th>
                    <th> Response</th>
                    <th> Status</th>

                    <th> Created by</th>
                    <th width="96px"> Created date</th>
                    <th> Favourite</th>
                    <th> Rewards</th>
                </tr>
            </thead>
            <tbody>
                <br></br>
                {
                    data.map(
                        idea =>
                        <tr key = {idea.id} > 
                                <td style={{"verticalAlign":"middle"}}>
                                    {/* <b> <i>  */}
                                        {idea.ideaId} 
                                    {/* </i> </b> */}
                                </td>
                                <td style={{"textAlign" : "left"}}>
                                    <a href={'/viewIdea/' + idea.id}>
                                        <div className='idea-title' style={{"fontWeight":"bold"}}> {idea.ideaTitle} </div>
                                        <p style={{"width" : "500px", "height" : "4.3em", "overflowY":"hidden", "textOverflow": "ellipsis", "fontSize":"14px"}}>
                                            {idea.ideaDescription}
                                        </p>
                                    </a>
                                </td>
                                <td style={{"display":"inline-block"}}>
                                    <span style={{"display":"inline-block", "paddingInline":"13px"}}>
                                        <AiOutlineLike size={"25px"} color={"DodgerBlue"} />
                                        <div>{idea.likesCount}</div>
                                    </span>
                                    <span style={{"display":"inline-block"}}>
                                        <AiOutlineComment size={"25px"} color={"Tomato"} />
                                        <div>{idea.commentsCount}</div>
                                    </span>
                                </td>
                                <td style={{"fontSize":"14px"}}> {idea.ideaStatus}</td>
                                <td style={{"fontSize":"14px"}}>
                                    {idea.fname + " " + idea.lname}
                                </td>
                                <td style={{"fontSize":"14px"}}>
                                    {
                                        new Date(idea.createdDate).toDateString().slice(8, 11) +
                                        new Date(idea.createdDate).toDateString().slice(4, 8) + 
                                        new Date(idea.createdDate).toDateString().slice(11)
                                    }
                                </td>

                                <td> 
                                    {IdeaService.isFavoriteIdeaOfCurrentUser(idea.id) === false ? (
                                    <FcLikePlaceholder size={"40px"} color="red" />
                                    ) : (
                                    <FcLike size={"40px"} color="red" />
                                    )}
                                </td>
                                <td>{idea.rewards}</td>
                                
                        </tr>
                        // </a>
                    )
                }
            </tbody>
        </table>
    ) 
}

export default AllMyFavoriteIdeas