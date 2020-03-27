import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

const VideoListComponent = ({}) => {
	return (
		<StaticQuery
			query={graphql`
				query ListQuery {
					allDatoCmsVideo {
						nodes {
							id
							video {
								title
								thumbnailUrl
								provider
								height
								url
								width
								providerUid
							}
							publishDate
							videoDetails
						}
					}
				}
			`}
			render={data => {
				console.log('data', data);
				return (
					<div>
						{data.allDatoCmsVideo.nodes.map(video => (
							<div key={video.id}>
								<img src={video.video.thumbnailUrl} />
								<div>{video.video.title}</div>
								<div>{video.videoDetails.description}</div>
								<p>publishDate: {video.publishDate}</p>
								<p>duration: {video.videoDetails.durationString}</p>
							</div>
						))}
					</div>
				);
			}}
		/>
	);
};

VideoListComponent.propTypes = {
	children: PropTypes.object,
};

export default VideoListComponent;
