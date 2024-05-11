import React, {FC, useEffect} from 'react';
import {IUser} from "@/types/types";

interface UserInfoProps {
    user?: IUser;
}

const UserInfo: FC<UserInfoProps> = ({user}) => {
    const formatPhoneNumber = (phoneNumber: string | undefined) => {
        if (!phoneNumber) return "";
        const firstPart: string = phoneNumber.slice(1, 4);
        const secondPart: string = phoneNumber.slice(4, 7);
        const thirdPart: string = phoneNumber.slice(7, 9);
        const fourthPart: string = phoneNumber.slice(9, 12);

        return `+${7} (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
    };

    useEffect(() => {
    }, [user])

    return (
        <div>
            <p>
                <span>{user && user.username}</span>
            </p>
            <p>
                <span>{user && user.email}</span>
            </p>
            <p>
                <span>{user && user.birthdate.toString()}</span>
            </p>
            <p>
                <span>{user && formatPhoneNumber(user.number)}</span>
            </p>

        </div>
    );
};

export default UserInfo;