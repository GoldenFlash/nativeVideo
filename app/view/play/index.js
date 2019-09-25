import React, { Component } from "react"
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import api from "../../api/api"
import Video from 'react-native-video';

import layout from "../../util/mixin"
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.getVideoInfo()
    }
    getVideoInfo = () => {
        let loginData = global.loginData
        let data = this.props.navigation.state.params.video
        api.getVideoInfo(loginData.session, data.id).then(res => {
            console.log("getVideoInfo", res)
            this.setState({
                videoInfo: res.data
            })
        })
    }
    render() {
        let videoInfo = this.state.videoInfo
        return (
            <View>
                {
                    videoInfo ? 
                    <Video source={{ uri: videoInfo.video }}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        controls                                 
                        onBuffer={this.onBuffer}                
                        onError={this.videoError}
                        style={styles.backgroundVideo} />
                        :null
                }
                
            </View>
        )
    }
}

var styles = StyleSheet.create({
    backgroundVideo: {
        width:"100%",
        height:220
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
    },
});