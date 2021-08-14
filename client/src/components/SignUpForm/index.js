// React imports
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Grid from '@material-ui/core/Grid';

// Utility imports
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
// import iconsPool from "../../assets/images/RoleIcons/roleIconsPool";

import topIcon from "../../assets/images/RoleIcons/top.png"
import jngIcon from "../../assets/images/RoleIcons/jng.png"
import midIcon from "../../assets/images/RoleIcons/mid.png"
import adcIcon from "../../assets/images/RoleIcons/adc.png"
import supIcon from "../../assets/images/RoleIcons/sup.png"

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';

// import SignUpVideo from "../assets/videos/1.mp4"
import { Box } from "@material-ui/core";
import { width } from "@material-ui/system";

const iconsPool = [
	{
		id: "top",
		src: topIcon
	},
	{
		id: "jng",
		src: jngIcon,
	},
	{
		id: "mid",
		src: midIcon
	},
	{
		id: "adc",
		src: adcIcon
	},
	{
		id: "sup",
		src: supIcon
	}
]





// Sign up function
function SignUpForm(props) {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [addUser] = useMutation(ADD_USER);




	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const mutationResponse = await addUser({
			variables: {
				email: formState.email,
				password: formState.password,
				firstName: formState.firstName,
				lastName: formState.lastName,
			},
		});
		const token = mutationResponse.data.addUser.token;
		Auth.login(token);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};



	return (
		<Box component="form"
			sx={{
				'& > :not(style)': { m: 1 },
			}}
			autoComplete="off"
			className="loginForm" id="SignUpForm" onSubmit={handleFormSubmit}
			display="block"
			overflow="hidden"
		>


			<h1 className="loginFont">Sign Up</h1>

			<Box m={2}>
				<label htmlFor="email"></label>
				<TextField
					required
					fullWidth
					id="outlined-basic"
					label="Email"
					variant="outlined"
					placeholder="email"
					name="email"
					type="email"
					id="email"
					onChange={handleChange}
				/>
			</Box>
			<Box m={2}>
				<label htmlFor="SummonerName"></label>
				<TextField
					required
					fullWidth
					id="outlined-basic"
					label="Summoner Name"
					variant="outlined"
					name="summonerName"
					type="summonerName"
					id="summonerName"
					onChange={handleChange}
				/>
			</Box>
			<Box m={2}>
				<label htmlFor="password"></label>
				<TextField
					required
					fullWidth
					id="outlined-basic"
					label="Password"
					variant="outlined"
					name="password"
					type="password"
					id="pwd"
					onChange={handleChange}
				/>
			</Box>
			<Box
				className="roleIcons"><h4>Choose your main and secondary role!</h4>
			</Box>


			<Box display="flex" className="imagesContainer">
				{iconsPool.map((src, index) => (
					<Box className="test">
						<input type="checkbox" className="iconsCheckbox" id={iconsPool.id} />
						<label for={iconsPool.id}>
							<img className="signupIcons" src={iconsPool[index].src} key={index} />
						</label>
						{console.log(iconsPool)}	
					</Box>				
				))}
				
			</Box>



			<Box>
				<Button
					className="loginSignBtn"
					variant="contained"
					color="primary"
					size="medium"
					type="submit"
					form="SignUpForm"
				>
					Sign Up
				</Button>
			</Box>
		</Box>

	);
}

export default SignUpForm;
