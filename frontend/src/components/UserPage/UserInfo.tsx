import React, {FC, useEffect} from 'react';
import {IUserResponse} from "@/types/types";

interface UserInfoProps {
    user: IUserResponse | null;
}

const UserInfo: FC<UserInfoProps> = ({user}) => {

    //раньше нужно было, чтобы внутри span номер отображался корректно
    const formatPhoneNumber = (phoneNumber: string | undefined) => {
        if (!phoneNumber) return "";
        const countryCode: string = phoneNumber.slice(0, 1);
        const firstPart: string = phoneNumber.slice(1, 4);
        const secondPart: string = phoneNumber.slice(4, 7);
        const thirdPart: string = phoneNumber.slice(7, 9);
        const fourthPart: string = phoneNumber.slice(9, 12);

        return `+${countryCode} (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
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