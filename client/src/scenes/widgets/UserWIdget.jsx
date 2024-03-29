import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Skeleton, Stack } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath, isProfile=false }) => {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        await fetch(`${process.env.REACT_APP_HOSTURL}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }).then(async (res) => {
            setLoaded(true);
            const data = await res.json();
            if (!res.ok) return;
            setUser(data);
        }).catch(err => {
            console.errror(err)
        })
    };
    const friendCount = useSelector(state => state.user.friendCount)

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if(!loaded)
        return (
            <Stack spacing={2}>
                <FlexBetween gap={1}>
                    <Skeleton variant="circular" width={60} height={60} animation='wave'/>
                    <Skeleton variant="rounded" width='85%' height='6rem'/>
                </FlexBetween>
                <Skeleton variant="rounded" width='100%' height='5.8rem' animation='wave'/>
                <Skeleton variant="rounded" width='100%' height='5.5rem'/>
            </Stack>
        )

    if (!user)
        return null;


    const {
        firstName,
        lastName,
        location,
        occupation,
        profileViews,
        createdAt
    } = user;
    const d=new Date(createdAt)

    return (
        <WidgetWrapper>
            {/* 1st row */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <FlexBetween gap="1rem" onClick={() => isProfile?null:navigate(`/profile/${userId}`)}>
                    <UserImage image={picturePath} alt={firstName} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={!isProfile && {
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={palette.neutral.dark}>{friendCount} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* 2nd row */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* 3rd row*/}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Profile views</Typography>
                    <Typography color={main} fontWeight="500">
                        {profileViews}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Member Since</Typography>
                    <Typography color={main} fontWeight="500">
                        {d.toLocaleString('default', { month: 'short' })+', '+d.getFullYear()}
                    </Typography>
                </FlexBetween>
            </Box>

            {/* <Divider /> */}

            {/* 4th row */}
            {/* <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box> */}
        </WidgetWrapper>
    );
};

export default UserWidget;