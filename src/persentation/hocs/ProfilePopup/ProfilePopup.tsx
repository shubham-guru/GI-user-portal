import { useSelector } from 'react-redux';
import { UserData } from '../../../domain/interfaces/UserData';

import "./profilePopup.css"
import { Image, Typography } from 'antd';

const ProfilePopup = () => {
  const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
  const userImage = user?.image;
  const firstLetter = user?.firstName.charAt(0) || '';
  const { Text } = Typography;

  return (
    <div>
      {
        userImage ?
          <Image src={userImage} alt="user_image" preview={false} width={60} className="profile-dropdown-image" />
          : <div id="user-initial-div">
            <Text className="user-initial-text">{firstLetter}</Text></div>
      }
    </div>
  )
}

export default ProfilePopup