AppSettingsPage({
  build(props) {
    return View(
      {
        style: {
          marginTop: '12px',
          padding: '10px',
          border: '1px solid #eaeaea',
          borderRadius: '6px',
          backgroundColor: 'blue',
        },
      },
      [
        TextInput({
          label: 'Alo',
          bold: true,
          value: item,
          subStyle: {
            color: '#333',
            fontSize: '14px',
          },
          maxLength: 200,
          onChange: (val) => {
          },
        })
      ]
    );
  },
})