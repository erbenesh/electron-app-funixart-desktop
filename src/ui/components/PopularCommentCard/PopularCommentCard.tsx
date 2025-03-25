import { IoIosArrowForward } from 'react-icons/io'
import { LuReplyAll } from 'react-icons/lu'
import { unixToDate } from '../../services/utils'
import styles from './PopularCommentCard.module.css'
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export const PopularCommentCard = (props) => {

    console.log(props.comment.release, props.comment.release.id ? props.comment.release.id : props.array.find(comment => props.comment.release === comment.release["@id"]).release.id);

    return (
        <Link to={`/release/${props.comment.release.id ? props.comment.release.id : props.array.find(comment => props.comment.release === comment.release["@id"]).release.id}`} className={styles.comment_wrap}>
            <div className={styles.comment}>
                <div className={styles.avatar}>
                    <div className={styles.image_border}>
                        <img src={props.comment.profile.avatar} className={styles.ava_image} alt={props.comment.profile.login + "ava"} />
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.text_block}>
                        <div className={styles.login_and_time}>
                            <p className={styles.commenter_login}>{props.comment.profile.login}</p> 

                            <span className={styles.timestamp}>к релизу</span>
                            <>
                                <p className={styles.timestamp}>{props.comment.release.title_ru ? props.comment.release.title_ru : props.array.find(comment => props.comment.release === comment.release["@id"]).release.title_ru}</p> 
                                <IoIosArrowForward style={{color: "grey", height: "0.9rem"}}/>
                            </>
                        
                        </div>
                        <p className={styles.comment_messege}>{parse(props.comment.message)}</p>
                    </div>
                    <div className={styles.action_buttons}>
                        <div className={styles.reply_and_like_buttons}>

                            <div className={styles.dislike_and_like_button}>

                                <time className={styles.timestamp} dateTime={props.comment.timestamp.toString()} title={unixToDate(props.comment.timestamp, "full")}>
                                    {unixToDate(props.comment.timestamp, "full").slice(0, 7)} в {unixToDate(props.comment.timestamp, "full").slice(14)} 
                                </time>
                               

                                <p className={styles.likes_count}>{props.comment.likes_count}</p>

                            </div>

                        </div>
                        { 
                        props.comment.reply_count > 0 && 
                            <button className={styles.show_all_replys} type="button">
                                <LuReplyAll className={styles.show_all_replys_ico}/> 
                                <p>Показать {props.comment.reply_count} ответов</p>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}