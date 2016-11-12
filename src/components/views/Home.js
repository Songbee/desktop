import {h} from "preact";

export default ({name}) => (
  <div>
    <h2>{name}</h2>
    <table class="table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Time</th>
          <th>Album</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Do I Wanna Know?</td>
          <td>Arctic Monkeys</td>
          <td>4:22</td>
          <td>AM</td>
        </tr>
        <tr>
          <td>Why'd You Only Call Me When...</td>
          <td>Arctic Monkeys</td>
          <td>2:41</td>
          <td>AM</td>
        </tr>
        <tr>
          <td>R U Mine?</td>
          <td>Arctic Monkeys</td>
          <td>3:22</td>
          <td>AM</td>
        </tr>
        <tr>
          <td>Arabella</td>
          <td>Arctic Monkeys</td>
          <td>3:27</td>
          <td>AM</td>
        </tr>
        <tr>
          <td>Do I Wanna Know?</td>
          <td>Arctic Monkeys</td>
          <td>4:22</td>
          <td>AM</td>
        </tr>
        <tr>
          <td>Do I Wanna Know?</td>
          <td>Gorillaz</td>
          <td>4:22</td>
          <td>AM</td>
        </tr>
      </tbody>
    </table>
  </div>
);
