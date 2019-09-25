import React, { Component } from "react"
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import api from "../../api/api"
import layout from "../../util/mixin"
export default class Classify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoList: []
        }
        this.page = 0
    }
    componentDidMount() {
        this.getVideoList()
    }
    static navigationOptions=(({navigation})=>{
        return{
            headerTitle: navigation.state.params.title
        }
    })
    getVideoList = () => {
        let {type,classid} = this.props.navigation.state.params
        this.page++

        let data = {
            limit: 6, 
            page: this.page,
        }
        if (type){
            data.type=type
        }
        if (classid){
            data.classid = classid
        }
        api.getVideoList(data).then(res => {
            let videoList = this.state.videoList
            let list = [...videoList, ...res.data.data]
            this.setState({
                videoList: list
            })
        })
    }
    goToPlay = (video) => {
        this.props.navigation.navigate("Play", { video: video })
    }
    renderListItem = (item, index) => {
        return (
            <View  style={styles.item_wrapper}>
                <TouchableOpacity
                    key={index}
                    style={styles.item_content}
                    onPress={() => {
                        this.goToPlay(item)
                    }}
                >
                    <View style={styles.item_img} ></View>
                    <Text>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    // ListHeaderComponent={header}
                    data={this.state.videoList}
                    // scrollEnabled={false}
                    numColumns={2}
                    keyExtractor={(item, index) => "id" + index}
                    renderItem={({ item, index, separators }) => (this.renderListItem(item, index))}
                    onEndReachedThreshold={0}
                    onEndReached={() => {
                        this.getVideoList()
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list_title: {
        marginLeft: 10
    },
    item_wrapper: {
        flexDirection: "row",
        justifyContent: "center",
        flex: 1
    },
    item_content: {
        width: "80%",
        marginTop: 20
    },
    item_img: {
        height: 100,
        width: "100%",
        marginBottom: 10,
        backgroundColor: "yellow"
    }
})