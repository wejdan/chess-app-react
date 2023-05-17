import React, { useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
} from "semantic-ui-react";
import styled from "styled-components";
import { resetRoom } from "../store/roomSlice";
import { useDispatch } from "react-redux";
import { reset } from "../store/gameSlice";
import { auth, database } from "../firebase";
import {
  child,
  get,
  off,
  onChildAdded,
  onChildMoved,
  onDisconnect,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";
import { userOn } from "../store/actions/usersActions";
import { setUsers } from "../store/usersSlice";
const Wrapper = styled.div`
  background-color: #222222;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;
function Home() {
  const navigate = useNavigate();
  //  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("location changed");
    dispatch(resetRoom());
    dispatch(reset());
  }, []);

  // stores the timestamp of my last disconnect (the last time I was seen online)

  return (
    <Wrapper>
      <Segment placeholder inverted color="white">
        <Grid stackable textAlign="center">
          <Divider vertical inverted>
            Or
          </Divider>

          <Grid.Row verticalAlign="middle">
            <Grid.Column width={8}>
              <Header color="gray" inverted icon>
                <Icon name="user" inverted color="gray" />
                Join Your Friend
              </Header>

              <Button
                onClick={() => navigate("join-game")}
                inverted
                basic
                color="teal"
              >
                Join Game
              </Button>
            </Grid.Column>

            <Grid.Column width={8}>
              <Header inverted icon>
                <Icon inverted name="users" />
                Play With Friends
              </Header>
              <Button
                onClick={() => navigate("create-game")}
                inverted
                basic
                color="blue"
              >
                Create Game
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Wrapper>
  );
}

export default Home;
