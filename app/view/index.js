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
import api from "../api/api"
import layout from "../util/mixin"
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newList: []
        }
        this.page = 0
    }
    componentDidMount() {
        this.getactor()
        this.getNewList()
        this.getTabList()
        this.getyouMayLike()
        this.getClassyfyList()
    }
    getTabList = () => {
        //tab分类
        api.getVideoIndex({type:1 }).then(res => {
            this.setState({
                tabList: res.data.data
            })
        })
    }

    getactor=()=>{
        api.getactor().then(res=>{
            this.setState({
                getactorList: res.data.data
            })
        })
    }
   
    getClassyfyList = () => {
        //内容列表分类
        api.getVideoIndex({ type: 2 }).then(res => {
            let classifyList = res.data.data
            let tasks = []
            classifyList.forEach(item=>{
                tasks.push(this.getVideoList(item.id))
            })
            Promise.all(tasks).then(res=>{
                res.forEach((list,index)=>{
                    classifyList[index].list = list.data.data
                })
                console.log("classifyList", classifyList)
                this.setState({
                    classifyList
                })
            })
            
        })
    }
    getNewList = () => {
        //最新视频
        api.getVideoList({limit:6, page: 1 }).then(res => {
            this.setState({
                newList: res.data.data
            })
        })
    }
    getyouMayLike=()=>{
        api.getVideoList({ limit: 6, page: 1,type:4 }).then(res => {
            this.setState({
                youMaylikeList: res.data.data
            })
        })
    }
    getVideoList=(classid)=>{
        return api.getVideoList({ limit: 6, page: 1, classid: classid })
    }
    geTabDetail = (title) => {
        this.props.navigation.navigate("Search", { title: title })
    }
    goToPlay = (video)=>{
        this.props.navigation.navigate("Play", { video: video})
    }
    goToClassify = (type,classid,title)=>{
        this.props.navigation.navigate("Classify", { 
            type,
            classid,
            title
        })
    }
    renderListItem = (item, index) => {
        return (
            <View style={styles.item_wrapper}>
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
    renderListHeader = (type,classid,title)=>{
        return (
            <TouchableOpacity onPress={()=>{
                this.goToClassify(type,classid, title)
            }}>
                <Text style={styles.list_title}>{title}</Text>
            </TouchableOpacity>    
        )
    }
    renderList = (type,classid,list, title,index) => {
        
        return (
            <View key={index} style={{ marginTop: 20, flex: 1 }}>
                <FlatList
                    ListHeaderComponent={this.renderListHeader(type,classid,title)}
                    data={list}
                    scrollEnabled={false}
                    numColumns={2}
                    keyExtractor={(item, index) => "id" + index}
                    renderItem={({ item, index, separators }) => (this.renderListItem(item, index))}
                    onEndReachedThreshold={0}
                    onEndReached={() => {
                        this.getNewList()
                    }}
                />
            </View>
        )
    }
    render() {
        let tabList = this.state.tabList || []
        let getactorList = this.state.getactorList||[]
        let newList = this.state.newList || []
        let youMaylikeList = this.state.youMaylikeList||[]
        let classifyList = this.state.classifyList || []
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {
                            tabList.map((item, index) => {
                                return (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={styles.tab_wrapper}
                                        onPress={()=>{
                                            this.geTabDetail(item.title)
                                        }}
                                        >
                                        <Image style={styles.tab_image} resizeMode="contain" source={{ uri: item.pic }}></Image>
                                        <Text>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {
                            getactorList.map(item=>{
                                return(
                                    <Image 
                                        style={styles.tactor_image} resizeMode="contain"
                                        source={{ uri: item.pic}}
                                        >

                                    </Image>
                                )
                            })
                        }
                    </View>
                    {this.renderList("","",newList, "最新视频")}
                    {this.renderList(4,"", youMaylikeList, "猜你喜欢")}
                    {
                        classifyList.map((item,index) => {
                            return (
                                this.renderList("",item.id,item.list, item.title, index)
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab_wrapper: { 
        width: "25%", 
        alignItems: "center", 
        justifyContent: "center",
        marginTop:10
    },
    tab_image: { 
        width: 40, 
        height: 40 
    },
    tactor_image: { 
        width: 30, 
        height: 30,
        borderRadius:15
    },
    list_title:{
        marginLeft:10
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