import warehouse_mutation from '../models/warehouse_mutation';

export const deleteMutation = async (req, res) => {
  try {
    const mutationId = req.params.id;
    const existingMutation = await warehouse_mutation.findOne({
      where: { id: mutationId },
      raw: true,
    });

    if (req.userData.warehouse_id != existingMutation.warehouse_id) {
      return res.status(403).json({
        success: false,
        message: 'You are unauthorized to delete this mutation',
      });
    }

    if (
      [
        'waiting for confirmation',
        'processing',
        'arrived',
        'on delivery',
      ].includes(existingMutation.status)
    ) {
      return res.status(404).json({
        success: false,
        message: 'Data cannot be deleted',
      });
    }
    await warehouse_mutation.update(
      { is_deleted: true },
      { where: { id: mutationId } },
    );

    res.status(200).send({
      success: true,
      message: 'Mutation deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
