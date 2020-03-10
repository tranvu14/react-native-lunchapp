import * as React from 'react';
import { Text, View, StyleSheet, ListView, Modal, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements'
import { TextInput, ScrollView } from 'react-native-gesture-handler';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    constructor() {
        super()
        this.state = {
            editedItem: 0,
            nameEdit: "",
            total: 10,
            isModalVisible: false,
            listDish: [
                { id: 1, name: "Cơm", count: 0, total: 0, disabled: false },
                { id: 2, name: "Canh", count: 0, total: 0, disabled: false },
            ]
        }
    }

    handleSelectDish(id) {
        var newList = [...this.state.listDish]
        newList.forEach((val, ind) => {
            if (val.id === id) {
                val.count++
                val.total++
            }
        })
        newList.forEach((val, ind) => {
            val.count === 1 ? val.disabled = false : val.disabled = true
        })
        this.setState({
            listDish: newList,
        })

    }
    handleUnSelectDish(id) {
        var newList = [...this.state.listDish]
        newList.forEach((val, ind) => {
            if (val.id === id) {
                val.count--
                val.total--
            }
        })
        newList.forEach((val, ind) => {
            val.disabled = false
        })
        this.setState({
            listDish: newList,
            picked: false
        })

    }
    handleAddDish() {
        var newList = [...this.state.listDish]
        if (this.nameDish) {
            var newDish = {
                id: newList.length + 1,
                name: this.nameDish,
                count: 0,
                total: 0,
                disabled: false
            }
            newList.push(newDish)
            this.setState({
                listDish: newList
            })
            this.textInput.clear()
        }

    }
    handleDeleteDish(id) {
        var newList = [...this.state.listDish].filter(val => val.id !== id)
        this.setState({
            listDish: newList
        })
    }
    setModalVisible(bool) {
        this.setState({ isModalVisible: bool })

    }
    setEditItem(itemEdit) {
        this.setState({
            editedItem: itemEdit
        })
    }
    handleEditItem(editedItem) {
        const newList = this.state.listDish.map((item, ind) => {
            if (item.id === editedItem) {
                if (this.state.nameEdit.length > 0) {
                    item.name = this.state.nameEdit;
                }
                return item;
            }
            return item
        })
        this.setState({
            listDish: newList
        })
    }
    render() {
        const role = this.props.navigation.state.params.role
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.text}>Xin mời lựa chọn món ăn</Text>
                    </View>
                    {
                        this.state.listDish.map((val, ind) => {
                            return (
                                <View style={styles.listMenu} key={ind} pointerEvents={val.disabled ? 'none' : 'auto'}>
                                    {
                                        role === "admin" ? (
                                            <View style={styles.controlButtons}>
                                                <Button
                                                    buttonStyle={styles.buttons}
                                                    icon={{ name: 'delete' }}
                                                    onPress={() => this.handleDeleteDish(val.id)}
                                                />
                                                <Button
                                                    buttonStyle={styles.buttons}
                                                    icon={{ name: 'edit' }}
                                                    onPress={() => { this.setModalVisible(true); this.setEditItem(val.id) }}
                                                />
                                            </View>
                                        ) : null
                                    }
                                    <Text style={styles.text}> {val.name}</Text>
                                    <View><Text style={styles.text}>{val.total}/{this.state.total} </Text></View>
                                    <View style={styles.listMenuControl} key={val.id} >
                                        <Button
                                            buttonStyle={styles.buttons}
                                            icon={{ name: 'remove' }}
                                            style={styles.buttons}
                                            onPress={() => this.handleUnSelectDish(val.id)}
                                            disabled={val.count === 0}


                                        />
                                        <Text style={styles.text}>{val.count}</Text>
                                        <Button
                                            buttonStyle={styles.buttons}
                                            icon={{ name: 'add' }}
                                            style={styles.buttons}
                                            onPress={() => this.handleSelectDish(val.id)}
                                            disabled={val.count === 1}
                                        />
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        role === "admin" ? (
                            <View>
                                <Text style={styles.text}>Thêm món ăn mới</Text>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="web-search"
                                    placeholder='Nhập tên món ăn'
                                    onChangeText={(nameDish) => (this.nameDish = nameDish)}
                                    ref={input => { this.textInput = input }}
                                />

                                <Button
                                    style={styles.buttonAdd}
                                    title="ADD"
                                    onPress={() => this.handleAddDish()}
                                />
                                <Modal
                                    visible={this.state.isModalVisible}
                                    onRequestClose={() => this.setModalVisible(false)}

                                >
                                    <View style={styles.modalContainer}>
                                        <View style={styles.innerContainer}>
                                            <Text style={styles.text}>Sửa tên món ăn</Text>
                                            <TextInput
                                                keyboardType="default"
                                                placeholder='Nhập tên món ăn'
                                                style={styles.textInput}
                                                defaultValue={this.state.nameEdit}
                                                onChangeText={(text) => this.setState({ nameEdit: text })}
                                            />
                                            <Button
                                                onPress={() => { this.setModalVisible(false), this.handleEditItem(this.state.editedItem) }}
                                                title="SAVE"
                                            />
                                        </View>

                                    </View>


                                </Modal>
                            </View>
                        ) : null
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#1a8cff',
        padding: 8,
    },
    listMenu: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        padding: 5,
        borderColor: '#1a8cff',
        borderWidth: 1,

    },
    text: {
        fontSize: 18,
        padding: 10
    },
    listMenuControl: {
        display: 'flex',
        flexDirection: 'row'
    },
    textInput: {
        padding: 10,
        width: 300,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        color: '#000000',

    },
    buttonAdd: {
        marginTop: 20,
        width: 100,
        alignSelf: "center",
    },
    buttons: {
        padding: 0,
        paddingVertical: 5
    },
    controlButtons: {
        display: "flex",
        flexDirection: 'row',
        alignSelf: 'center',
        width: 70,
        justifyContent: 'space-between'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },


});
