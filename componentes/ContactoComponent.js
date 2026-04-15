import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

function Contacto() {
  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title title="Información de contacto" titleStyle={styles.cardTitle} />
        <Card.Content>
          <Text style={styles.paragraph}>Kaixo Mendizale!</Text>
          <Text style={styles.paragraph}>
            Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.
          </Text>
          <Text style={styles.paragraph}>Para lo que quieras, estamos a tu disposición!</Text>
          <Text style={styles.detail}>Tel: +34 948 277151</Text>
          <Text style={styles.detail}>Email: gaztaroa@gaztaroa.com</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  cardTitle: {
    textAlign: 'center',
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 22,
  },
  detail: {
    marginBottom: 12,
  },
});

export default Contacto;
