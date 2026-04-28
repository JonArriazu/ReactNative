import { Component } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView, Modal } from 'react-native';
import { Card, Text, IconButton, TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';
import { postComentario } from '../redux/ActionCreators';
import { baseUrl } from '../comun/comun';
import { colorGaztaroaOscuro } from '../comun/comun';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario)),
});

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
          style={styles.image}
          imageStyle={styles.imageBorder}
        >
          <Text style={styles.titulo}>{excursion.nombre}</Text>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>{excursion.descripcion}</Text>
          <View style={styles.iconoContainer}>
            <IconButton
              icon={props.favorita ? 'heart' : 'heart-outline'}
              size={28}
              onPress={() =>
                props.favorita
                  ? console.log('La excursión ya se encuentra entre las favoritas')
                  : props.onPressFav()
              }
            />
            <IconButton
              icon="pencil"
              size={28}
              onPress={() => props.onPressComment()}
            />
          </View>
        </Card.Content>
      </Card>
    );
  }

  return <View />;
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  return (
    <Card style={styles.card}>
      <Card.Title title="Comentarios" />
      <Card.Content>
        {comentarios.map((item) => {
          const fechaCorregida = item.dia.replace(/\s*:\s*/g, ':');
          const fecha = new Date(fechaCorregida).toLocaleString('es-ES', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          return (
            <View key={item.id} style={styles.comentarioContainer}>
              <Text style={styles.comentarioTexto}>{item.comentario}</Text>
              <Text style={styles.comentarioValoracion}>
                {item.valoracion} estrellas
              </Text>
              <Text style={styles.comentarioAutor}>
                -- {item.autor}, {fecha}
              </Text>
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    };
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    });
  }

  gestionarComentario(excursionId) {
    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );
    this.resetForm();
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some((el) => el === excursionId)}
          onPressFav={() => this.marcarFavorito(excursionId)}
          onPressComment={() => this.toggleModal()}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === +excursionId
          )}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Añadir comentario</Text>

            <View style={styles.estrellas}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  icon={star <= this.state.valoracion ? 'star' : 'star-outline'}
                  size={32}
                  iconColor={colorGaztaroaOscuro}
                  onPress={() => this.setState({ valoracion: star })}
                />
              ))}
            </View>

            <TextInput
              label="Autor"
              value={this.state.autor}
              onChangeText={(text) => this.setState({ autor: text })}
              style={styles.formInput}
              left={<TextInput.Icon icon="account" />}
            />

            <TextInput
              label="Comentario"
              value={this.state.comentario}
              onChangeText={(text) => this.setState({ comentario: text })}
              style={styles.formInput}
              multiline={true}
              left={<TextInput.Icon icon="comment-text" />}
            />

            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={() => this.gestionarComentario(+excursionId)}
                style={styles.modalButton}
              >
                Enviar
              </Button>
              <Button
                mode="outlined"
                onPress={() => this.resetForm()}
                style={styles.modalButton}
              >
                Cancelar
              </Button>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    justifyContent: 'flex-start',
    minHeight: 180,
    padding: 16,
  },
  imageBorder: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  comentarioContainer: {
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  comentarioTexto: {
    fontSize: 16,
    marginBottom: 10,
  },
  comentarioValoracion: {
    fontSize: 15,
    marginBottom: 6,
  },
  comentarioAutor: {
    fontSize: 14,
    color: 'gray',
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
    marginTop: 60,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  estrellas: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  formInput: {
    marginBottom: 16,
  },
  modalButtons: {
    marginTop: 16,
  },
  modalButton: {
    marginBottom: 12,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);