import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				></meta>
			</Head>
			<MeetupList meetups={props.loadedMeetups} />
		</Fragment>
	);
}

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	//fetch dat from API
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export async function getStaticProps() {
	//fetch data from an API

	const client = await MongoClient.connect(
		"mongodb+srv://ngando:Ngan15937!@cluster0.md7gt.mongodb.net/meetup?retryWrites=true&w=majority"
	);

	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();
	client.close();

	return {
		props: {
			loadedMeetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
				key: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
