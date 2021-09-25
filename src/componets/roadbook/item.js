import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	image: {
	},
	img: {
		margin: "auto",
		display: "block",
		maxWidth: "80%",
		maxHeight: "80%"
	}
}));
export default function Item() {
	const classes = useStyles();
	return (
		< Grid container spacing={5} >
			<Grid
				item
				xs={12}
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Grid>
					<Typography gutterBottom variant="body1">
						183.4 km
					</Typography>
					<Typography variant="body1" gutterBottom>
						25.5 km
					</Typography>
				</Grid>

				<Grid item xs={6}
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					<ButtonBase className={classes.image}>
						<img className={classes.img} alt="complex" src="/assets/image1.png" />
					</ButtonBase>
				</Grid>
				<Grid item xs={4}>
					<Grid item>
						<Typography variant="subtitle1">Peligro dos</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid >
	);
}