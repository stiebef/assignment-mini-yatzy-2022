import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#87cefa',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#87cefa',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  total: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
   
  },
  /* row: {
    marginTop: 20,
    padding: 10
  }, */
  flex: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  flex2: {
    flexDirection: "row",
    justifyContent: 'center'
    
  },
  pointsNumbers: {
    
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 8,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#73CED6",
    justifyContent: 'center',
    alignSelf: 'center',

    margin: 40,
    padding: 10,
    width: 150,
    borderRadius: 20,

  },
  buttonText: {
    //color:"#2B2B52",
    color: '#000000',
    fontSize: 20
  },
  grid: {
    alignItems: 'center',
  },
  /* skill: {
    marginTop: 35,
    marginLeft: 35,
    fontSize: 25,

  }, */
 /*  value: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  }, */
 /*  skills: {
    alignItems: 'center',
  }, */
});