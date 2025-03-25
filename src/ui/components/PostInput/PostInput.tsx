import React, { useState } from 'react';
import styles from './PostInput.module.css'; // Стили (см. ниже)
import { IoIosArrowForward } from 'react-icons/io';

interface PostInputProps {
  avatarUrl: string;
  placeholder?: string;
  onPostSubmit?: (text: string) => void;
}

export const PostInput: React.FC<PostInputProps> = ({ 
  avatarUrl, 
  placeholder = "Что у вас нового?", 
  onPostSubmit 
}) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim() && onPostSubmit) {
      onPostSubmit(postText);
      setPostText('');
    }
  };

  return (
    <form className={styles.post_input_container} onSubmit={handleSubmit}>
        <div className={styles.avatar_container}>
            <img 
            src={avatarUrl} 
            alt="User avatar" 
            className={styles.user_avatar}
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
            }}
            />
        </div>
        
        <div className={styles.input_wrapper}>
            <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={placeholder}
            className={styles.post_input}
            />
            
            {postText && (
            <button type="submit" className={styles.submit_button}>
                <IoIosArrowForward style={{width: 1.25+"rem", height: 1.25+"rem"}}/>
            </button>
            )}
        </div>
    </form>
  );
};